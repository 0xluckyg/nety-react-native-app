import React from 'react'
import {
  View,
  Image,
  TextInput,
  Switch,
  Text,
  TouchableOpacity,
  Modal,
  DatePickerIOS,
  Picker
} from 'react-native'
import moment from 'moment'
import _ from 'lodash'

class Form extends React.Component {
  refs = {}
  names = {}
  values = {}
  validations = {}

  state = {
    values: {},
    modalVisibility: {},
    pickerSelection: {},
    errors: new Set(),
    invalidFields: new Set()
  }

  openGroup = false

  componentWillMount () {
    // What is this for again?
    this.names = this.props.formula.fields.map(field => field.name)

    // const fields = this.props.formula.fields

    let values = {}
    let validations = {}
    let modalVisibility = {}
    let pickerSelection = {}

    this.props.formula.fields.forEach(field => {
      values[field.name] = field.value || field.switch || field.subtitleText || field.labelText || null
      validations[field.name] = field.validations || []
      if (field.picker) {
        modalVisibility[field.name] = false

        if (field.picker === 'normal') {
          pickerSelection[field.name] = 0
        } else {
          values[field.name] = new Date()
        }
      }
    })

    this.validations = validations
    this.props.onChange(values)
    this.setState({modalVisibility, pickerSelection})
  }

  // Groups of fields are put under a parent view
  flattenFields (collection, i, arr) {
    const defaultGroupStyle = this.props.formula.config.groupStyle
    const field = collection[0]

    if (collection.length > 1) {
      return (
        <View key={i} style={field.props.groupStyle || defaultGroupStyle}>
          {collection}
        </View>
      )
    } else if (collection.length === 1) {
      return collection[0]
    } else {
      return null
    }
  }

  // Groups fields into an array. This is a necessary step to put them under the same view
  groupFields (groupsArray, field, i, fieldsArray) {
    if (field.props.group === 'start') {
      this.openGroup = true
      groupsArray.push([])
    }

    if (this.openGroup) {
      groupsArray[groupsArray.length - 1].push(field)
    } else {
      groupsArray.push([field])
    }

    if (field.props.group === 'end') {
      this.openGroup = false
    }
    return groupsArray
  }

  // Creates Field JSX from object specification
  renderField (field, i, arr) {
    const { config } = this.props.formula
    const defaultContainerStyle = config.containerStyle

    let icon = field.iconSource ? this.renderIcon(config, field) : null
    let switchButton = field.switch ? this.renderSwitch(config, field) : null
    let textfield = (field.placeholder || field.value) ? this.renderTextField(config, field) : null
    let titleLabel = field.labelText ? this.renderLabel(config, field) : null
    let subtitle = field.subtitleText ? this.renderSubtitle(config, field) : null
    let modal

    switch (field.picker) {
      case 'normal':
        modal = this.renderPicker(config, field)
        break
      case 'date':
      case 'time':
        modal = this.renderDatePicker(config, field)
        break
      default:
        modal = null
        break
    }

    let errorStyle = (field.errorStyle || config.errorStyle || {borderColor: 'red', borderWidth: 1})
    errorStyle = this.state.invalidFields.has(field.name) ? errorStyle : null

    return (
      <TouchableOpacity
        key={i}
        style={[(field.containerStyle || defaultContainerStyle), field.overrideContainerStyle, errorStyle]}
        group={field.group}
        groupStyle={field.groupStyle}
        onPress={field.onPress}
        activeOpacity={field.onPress ? 0.2 : 1.0}
        >
        { modal }
        { icon }
        { textfield }
        { titleLabel }
        { switchButton }
        { subtitle }
      </TouchableOpacity>
    )
  }

  renderIcon (config, field) {
    const defaultIconStyle = config.iconStyle
    return (
      <Image style={field.iconStyle || defaultIconStyle} source={field.iconSource} />
    )
  }

  renderSwitch (config, field) {
    const defaultSwitchStyle = config.switchStyle
    const name = field.name

    const defaultOnValueChange = function (name, value) {
      let values = this.props.values
      values[name] = value
      this.props.onChange(values)
    }.bind(this, name)

    return (
      <Switch
        disabled={field.switchDisabled || false}
        value={this.props.values[field.name] || false}
        style={field.switchStyle || defaultSwitchStyle}
        onValueChange={field.onValueChange || defaultOnValueChange}
      />
    )
  }

  toggleModalVisibility (field, value) {
    let modalVisibility = this.state.modalVisibility
    modalVisibility[field.name] = value
    this.setState({ modalVisibility })
  }

  renderTextField (config, field) {
    const defaultFieldStyle = config.fieldStyle
    const defaultPlaceholder = config.placeholder
    const defaultPlaceholderColor = config.placeholderColor
    const defaultEditable = config.editable || true
    const defaultKeyboardType = config.keyboardType || 'default'

    const name = field.name

    const defaultOnChangeText = function (name, value) {
      let values = this.props.values
      values[name] = value
      this.props.onChange(values)
    }.bind(this, name)

    const defaultOnSubmitEditing = function () {}
    const defaultOnEndEditing = function (field) {
      let errors = this.state.errors
      let invalidFields = this.state.invalidFields

      // TODO: Refactor this out!
      if (field.confirmable || field.name.endsWith('Confirmation')) {
        let name = field.name.endsWith('Confirmation') ? field.name.substring(0, field.name.length - 12) : field.name
        let confirmationName = name + 'Confirmation'
        let originalValue = this.props.values[name]
        let confirmationValue = this.props.values[confirmationName]
        let errorMessage = `${_.capitalize(name)} and confirmation do not match!`

        if (originalValue !== confirmationValue) {
          errors.add(errorMessage)
          invalidFields.add(name)
          invalidFields.add(confirmationName)
        } else {
          errors.delete(errorMessage)
          invalidFields.delete(name)
          invalidFields.delete(confirmationName)
        }
      }

      if (field.validations) {
        let value = this.props.values[field.name] || ''

        field.validations.forEach((validation) => {
          if (!validation.predicate(value)) {
            errors.add(validation.message)
            invalidFields.add(field.name)
          } else {
            errors.delete(validation.message)

            let fieldHasErrors =
              field.validations
                .map(validation => errors.has(validation.message)) // Array of whether error messages are being shown
                .includes(true)

            if (!fieldHasErrors) {
              invalidFields.delete(field.name)
            }
          }
        })

        this.setState({...this.state, invalidFields, errors})
      }
    }.bind(this, field)
    const modalOnFocus = this.toggleModalVisibility.bind(this, field, true)
    const defaultOnTouchStart = field.picker ? modalOnFocus : function () {}

    let value = this.props.values[field.name]
    let dateFormat = field.picker === 'date' ? 'MM/DD/YY' : 'HH:mm'
    let dateValue = value instanceof Date ? moment(value).format(dateFormat) : ''

    return (
      <TextInput
        ref={(self) => { this.refs[field.name] = self }}
        style={[(field.fieldStyle || defaultFieldStyle), field.overrideTextFieldStyle]}
        keyboardType={field.keyboardType || defaultKeyboardType}
        value={['date', 'time'].includes(field.picker) ? dateValue : this.props.values[field.name]}
        editable={field.editable || defaultEditable}
        secureTextEntry={field.secureTextEntry || false}
        returnKeyType='go'
        autoCapitalize={field.autoCapitalize || config.autoCapitalize || 'none'}
        autoCorrect={false}
        onTouchStart={defaultOnTouchStart}
        onEndEditing={field.onEndEditing || defaultOnEndEditing}
        onChangeText={field.onChangeText || defaultOnChangeText}
        onSubmitEditing={field.onSubmitEditing || defaultOnSubmitEditing}
        underlineColorAndroid='transparent'
        placeholder={defaultPlaceholder || field.placeholder}
        placeholderTextColor={defaultPlaceholderColor || field.placeholderColor}
      />
    )
  }

  renderDatePicker (config, field) {
    const defaultOnDateChange = function (name, value) {
      let values = this.props.values
      values[name] = value
      this.props.onChange(values)
    }.bind(this, field.name)

    const doneButtonTapped = this.toggleModalVisibility.bind(this, field, false)

    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalVisibility[field.name] || false}
        onRequestClose={() => print('Modal has been closed.')}
      >
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View style={{backgroundColor: 'rgba(255,255,255,0.9)', borderColor: 'black', borderWidth: 1, borderRadius: 10, height: 250, width: 300}}>
            <View style={{height: 30, width: 300, backgroundColor: 'rgba(0,0,0,0.9)', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
              <TouchableOpacity
                onPress={doneButtonTapped}
              >
                <Text style={{textAlign: 'right', fontSize: 16, color: 'rgba(255,255,255,0.9)', paddingVertical: 10, paddingRight: 15}}>DONE</Text>
              </TouchableOpacity>
            </View>
            <DatePickerIOS
              style={{height: 100, width: 300}}
              date={this.props.values[field.name] || new Date()}
              mode={field.picker}
              onDateChange={field.onDateChange || defaultOnDateChange}
              minuteInterval={10}
              minimumDate={field.minimumDate}
          />
          </View>
        </View>
      </Modal>
    )
  }

  // TODO: Refactor this and datepicker into one method
  renderPicker (config, field) {
    const defaultOnValueChange = function (name, value, position) {
      let values = this.props.values
      values[name] = value
      this.props.onChange(values)
      let pickerSelection = this.state.pickerSelection
      pickerSelection[name] = value

      // Remove this is picker can't be fixed
      this.setState({
        ...this.state,
        pickerSelection
      })
    }.bind(this, field.name)

    const doneButtonTapped = this.toggleModalVisibility.bind(this, field, false)

    let data = field.pickerData || ['No', 'Data', 'Available']

    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalVisibility[field.name] || false}
        onRequestClose={() => print('Modal has been closed.')}
      >
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View style={{backgroundColor: 'rgba(255,255,255,0.9)', borderColor: 'black', borderWidth: 1, borderRadius: 10, height: 250, width: 300}}>
            <View style={{height: 30, width: 300, backgroundColor: 'rgba(0,0,0,0.9)', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
              <TouchableOpacity
                onPress={doneButtonTapped}
              >
                <Text style={{textAlign: 'right', fontSize: 16, color: 'rgba(255,255,255,0.9)', paddingVertical: 10, paddingRight: 15}}>DONE</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={this.state.pickerSelection[field.name]}
              style={{height: 100, width: 300}}
              onValueChange={field.onValueChange || defaultOnValueChange}
            >
              {
                data.map((value, i) => <Picker.Item key={i} label={value} value={value} />)
              }
            </Picker>
          </View>
        </View>
      </Modal>
    )
  }

  renderLabel (config, field) {
    const defaultLabelStyle = config.labelStyle
    return (
      <Text style={field.labelStyle || defaultLabelStyle}>
        {field.labelText}
      </Text>
    )
  }

  renderSubtitle (config, field) {
    const defaultSubtitleStyle = config.subtitleStyle
    return (
      <Text style={field.subtitleStyle || [defaultSubtitleStyle, field.overrideSubtitleStyle]}>
        {field.subtitleText}
      </Text>
    )
  }

  validateFields () {
    let errors = [...this.state.errors]
    if (errors && errors.length > 0) {
      let style = this.props.formula.config.errorTextStyle || {textAlign: 'center', color: 'red', fontSize: 12}
      return (
        <View style={{marginBottom: 15}}>
          { errors.map((value, i) => <Text key={'Error ' + i} style={style}>{value}</Text>) }
        </View>
      )
    }
  }

  render () {
    return (
      <View>
        {
          this.props.formula.fields
          .map(this.renderField.bind(this))
          .reduce(this.groupFields.bind(this), [])
          .map(this.flattenFields.bind(this))
        }
        {
          this.validateFields.bind(this)()
        }
      </View>
    )
  }
}

export default Form
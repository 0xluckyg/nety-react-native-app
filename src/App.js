import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from './components/routes';
import * as networkActions from './actions/networkActions';
import * as profileActions from './actions/profileActions';
import * as contactsActions from './actions/contactsActions';
// import initialUsers from './helper/initialUsers'

export const currentUser = {
  id: 0,
  firstName: "Wade",
  lastName: "Wilson",
  status: "Chimichongas!",
  bio: "AKA Deadpool #Driveby",
  imageUrl: "https://pbs.twimg.com/profile_images/716293413759377408/2W8UoVU1.jpg",
  about: {
      age: 35,
      school: 'Schools For Chumps',
      profession: 'Ass Kicking',
      job: 'Merc With A Mouth'
  },
  experiences: [
      {
          name: 'Current User in This App',
          description: 'Today was about as much fun as a sandpaper dildo.',
          start: 'Right This Second',
          end: 'Now'
      },
      {
          name: 'Deadpool in Deadpool',
          description: 'Good Deadpool',
          start: 'Mar 10, 16',
          end: 'Mar 10, 17'
      },
      {
          name: 'Deadpool in X-Men Origins: Wolverine',
          description: 'Bad Deadpool',
          start: 'Apr 09, 09',
          end: 'May 01, 09'
      }
  ]
}

export const contact = {
    id: 4,
    firstName: "Son",
    lastName: "Goku",
    status: "Power comes in response to a need, not a desire. You have to create that need.",
    bio: "Super Saiyan God in the Making",
    imageUrl: "https://static4.comicvine.com/uploads/square_small/11112/111122896/5402108-goku_v2_by_saodvd-dac3ion.png",
    about: {
        age: 44,
        school: 'No Education',
        profession: 'Fighting',
        job: 'Super Saiyan'
    },
    experiences: [
        {
            name: 'Dragon Ball Z',
            description: 'I played the lead character.',
            start: 'Apr 26, 89',
            end: 'Jan 31 96'
        }
    ]
}

export const initialUsers = [
	{
		id: 1,
		firstName: "Donald",
		lastName: "Trump",
		status: "Grab em by the pussy!",
    bio: "Current President of the United States",
		imageUrl: "https://static3.businessinsider.com/image/56feb17752bcd01b008ba4e8-480/donald-trump.jpg",
        about: {
            age: 70,
            school: 'University of Pennsylvania',
            profession: 'Business',
            job: 'White House'
        },
        experiences: [
            {
                name: 'Software Engineer at Nety',
                description: 'I worked as an app developer awoeifjaowiejfo awoifjaow awo ije foawij oaiwejf oaiwej foijaw oefijawe ',
                start: 'Mar 10, 16',
                end: 'Mar 10, 17'
            },
            {
                name: 'App developer at TRN',
                description: 'I worked as an app developer',
                start: 'Mar 10, 16',
                end: 'Mar 10, 17'
            },
            {
                name: 'Marketer at Facebook',
                description: 'I worked as an app developer',
                start: 'Mar 10, 16',
                end: 'Mar 10, 17'
            }
        ]
	},
	{
		id: 2,
		firstName: "Barack",
		lastName: "Obama",
		status: "Yes We Can!",
        bio: "Former President of the United States",
		imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/220px-President_Barack_Obama.jpg",
        about: {
            age: 55,
            school: 'Harvard Law School',
            profession: 'Ass Kicking',
            job: 'Retired President'
        },
        experiences: [
            {
                name: 'Software Engineer at Nety',
                description: 'I worked as an app developer awoeifjaowiejfo awoifjaow awo ije foawij oaiwejf oaiwej foijaw oefijawe ',
                start: 'Mar 10, 16',
                end: 'Mar 10, 17'
            },
            {
                name: 'App developer at TRN',
                description: 'I worked as an app developer',
                start: 'Mar 10, 16',
                end: 'Mar 10, 17'
            },
            {
                name: 'Marketer at Facebook',
                description: 'I worked as an app developer',
                start: 'Mar 10, 16',
                end: 'Mar 10, 17'
            }
        ]
	},
	{
		id: 3,
		firstName: "Bruce",
		lastName: "Wayne",
		status: "I am the night. I am Batman!",
		imageUrl: "https://s-media-cache-ak0.pinimg.com/736x/15/46/62/1546621aa77278241275cf101d8b383d.jpg",
        about: {
            age: 30,
            school: 'Gotham University',
            profession: 'Justice',
            job: 'Wayne Enterprises'
        },
        experiences: [
            {
                name: 'Software Engineer at Nety',
                description: 'I worked as an app developer awoeifjaowiejfo awoifjaow awo ije foawij oaiwejf oaiwej foijaw oefijawe ',
                start: 'Mar 10, 16',
                end: 'Mar 10, 17'
            },
            {
                name: 'App developer at TRN',
                description: 'I worked as an app developer',
                start: 'Mar 10, 16',
                end: 'Mar 10, 17'
            },
            {
                name: 'Marketer at Facebook',
                description: 'I worked as an app developer',
                start: 'Mar 10, 16',
                end: 'Mar 10, 17'
            }
        ]
	}
]

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

class App extends Component {

  componentDidMount() {
    this.props.addToNetwork(initialUsers)
    this.props.setCurrentUser(currentUser)
    this.props.addToContacts([contact])
  }

  render() {
    return (
      <Router/>
    );
  }
}

const mapStateToProps = (state) => (
	{
		network: state.network.network,
		range: state.network.range,
        currentUser: state.profile.currentUser,
        contacts: state.contacts.contacts
	}
)

const actions = { ...networkActions, ...profileActions, ...contactsActions}
export default connect(mapStateToProps, actions)(App);
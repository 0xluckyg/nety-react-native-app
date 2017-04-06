import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from './components/routes';
import * as networkActions from './actions/networkActions';
import * as profileActions from './actions/profileActions';
// import initialUsers from './helper/initialUsers'

class App extends Component {

  componentDidMount() {
    this.props.addToNetwork(initialUsers)
    this.props.setCurrentUser(currentUser)
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
    currentUser: state.profile.currentUser
	}
)

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

export const initialUsers = [
	{
		id: 1,
		firstName: "Donald",
		lastName: "Trump",
		status: "Grab em by the pussy!",
		imageUrl: "https://static3.businessinsider.com/image/56feb17752bcd01b008ba4e8-480/donald-trump.jpg"
	},
	{
		id: 2,
		firstName: "Barack",
		lastName: "Obama",
		status: "Yes We Can!",
		imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/220px-President_Barack_Obama.jpg"
	},
	{
		id: 3,
		firstName: "Bruce",
		lastName: "Wayne",
		status: "I'm Batman!",
		imageUrl: "https://s-media-cache-ak0.pinimg.com/736x/15/46/62/1546621aa77278241275cf101d8b383d.jpg"
	}
]

const actions = { ...networkActions, ...profileActions}
export default connect(mapStateToProps, actions)(App);
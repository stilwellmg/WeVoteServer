import axios from 'axios';
import BallotReturnNavigation from "components/base/BallotReturnNavigation";
import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router";

export default class AddFriendsMessagePage extends React.Component {
	constructor(props) {
		super(props);
	}

	static getProps() {
		return {};
	}

	render() {
	    return (
			<div>
                <BallotReturnNavigation back_to_ballot={false} />
				<div className="container-fluid well well-90">
					<h2 className="text-center">Add Friends</h2>
					<div>
						<label htmlFor="last-name">Would you like to include a message? <span>(Optional)</span></label><br />
						<input type="text" name="add_friends_message" className="form-control"
							   defaultValue="Please join me in preparing for the upcoming election." /><br />
						<br />
						<Link to="add_friends_from_address"><Button bsStyle="primary">Next ></Button></Link>
					</div>
				</div>
			</div>
		);
	}
}

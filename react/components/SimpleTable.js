
import React from 'react';

export default class SimpleTable extends React.Component {
	constructor() {
		super();
		// Initial state of the component
    this.state = {
      resources: []
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.serverRequest = $.get(this.props.source, function (result) {
      this.setState({
        resources: result.resources.results
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

	render() {
		return (
			<div>
				<Table
          resources={this.state.resources}
				/>
			</div>
		);
	}
}

class Table extends React.Component {
	render(){
		let sections = [];
		this.props.resources.forEach(function(resource){
			sections.push(<Section key={resource.slug} data={resource} />);
		}.bind(this))
		return(
			<div className='container'>{sections}</div>
		);
	}
}
//
class Section extends React.Component {
	render(){
    let resource = this.props.data
    let url = 'http://'+resource.content.url

    let subjects = []
    resource.subjects.forEach(function(subject) {
      subjects.push(<div key={subject._id}>{subject.title}</div>)
    })

    let resourceTypes = []
    resource.resourceTypes.forEach(function(resourceType) {
      resourceTypes.push(<div key={resourceType._id}>{resourceType.title}</div>)
    })

		return(
			<div className='resource row'>
				<div className='col-md-4 title'>
          <a href={url}>{resource.title}</a>
        </div>
        <div className='col-md-3'>{resource.author}</div>
        <div className='col-md-3'>{subjects}</div>
        <div className='col-md-2'>{resourceTypes}</div>
			</div>
		);
	}
}

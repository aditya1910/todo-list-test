import React, { Component } from 'react';

export default function Button(props) {
    return (<button className="button" onClick={() => props.handleAction(props._id)}>{props.text}</button>)
}


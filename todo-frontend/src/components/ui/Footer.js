import React from 'react';
import Filter from './Filter';

export default function Footer(props) {
    const { count, filter, changeFilter } = props;

    return (
        <footer className="clearfix">
            <div className="pull-left">
                {`${count} items left`}
            </div>
            <div className="pull-right">
                <Filter {...{ filter, changeFilter }} />
            </div>
        </footer>
    );
}

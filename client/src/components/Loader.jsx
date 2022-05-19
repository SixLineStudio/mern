import React from 'react';

const Loader = () => {
    return (

            <div className="progress" style={{position:'fixed', padding:'0', margin:'0', width:'100%'}}>
                <div className="indeterminate"></div>
            </div>

    );
};

export default Loader;
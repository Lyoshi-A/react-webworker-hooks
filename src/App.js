import React, { useState, useEffect } from 'react';
import { slowSort } from './services/SortService';
import './App.style.css';
import wWorker from './app.worker.js';
import WebWorker from './WebWorker';

const App = props => {
    const [usersWrapperClasses, setClasses] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [view, setView] = useState('success');
    const worker = new WebWorker(wWorker);
    const isLoaded = (v,vw='success') => {
        setLoading(v)
        setView(vw)
        setClasses( v ? 'sorting' : '')
    }


    useEffect(() => {
        isLoaded(true)
        worker.postMessage({type:'list'})
        worker.addEventListener('message', (event) => {
            const sortedList = event.data
            setUsers(sortedList)
            isLoaded(false)
        })
    },[])


    const clickAny = async () => {
        console.log('clicking.......')
        console.log('clicked')
    }

    const updateAsyncUsers = async (sort) => {
       worker.postMessage({users, order:sort, type:'sort'})
        isLoaded(true)
        worker.addEventListener('message', (event) => {
            const sortedList = event.data
            setUsers(sortedList)
            isLoaded(false)
        })
    }

    const sortAsyncAscending = () => updateAsyncUsers('asc')
    const sortAsyncDescending = () => updateAsyncUsers('desc')

    const updateUsers = async (sort) => {
        isLoaded(true, 'danger')
        setUsers(await slowSort(users, sort))
        isLoaded(false, 'danger')
    }
    const sortDescending = () => updateUsers((a,b) => a > b )
    const sortAscending = () => updateUsers((a,b) => a < b )


    const renderUsers = () => {
        return users.slice(0,25).map((user, index) => {
            return (
                <div key={index} className="card">
                    <div className="card-header">{user.name}</div>
                    <div className="card-body">
                        <h6 className="card-title">{user.email}</h6>
                        <p className="card-text">{user.joinedOn.toString()}</p>
                        <div className={`alert alert-${view}`} role="alert">
                            Comments <span className="badge badge-light">{user.commentCount}</span>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return <div className=".appContainer">
                <div className="appNav">
                    <div className="navBlock">
                        <div className="alert alert-success" role="alert">Sort comments with WebWorker</div>
                        <div className="btn-group mr-2 mt-2" role="group" aria-label="Async">
                            <button
                                onClick={sortAsyncAscending}
                                type="button"
                                disabled={isLoading}
                                className="btn btn-primary">
                                asc
                            </button>
                            <button
                                onClick={sortAsyncDescending}
                                type="button"
                                disabled={isLoading}
                                className="btn btn-success">
                                desc
                            </button>
                        </div>
                    </div>
                    <div className="navBlock">
                        <div className="alert alert-danger" role="alert">Sort comments WITHOUT WebWorker</div>
                        <div className="btn-group mr-2 mt-2" role="group" aria-label="Sync">
                            <button
                                onClick={sortAscending}
                                type="button"
                                disabled={isLoading}
                                className="btn btn-primary">
                                asc
                            </button>
                            <button
                                onClick={sortDescending}
                                type="button"
                                disabled={isLoading}
                                className="btn btn-success">
                                desc
                            </button>
                            <button
                                onClick={clickAny}
                                type="button"
                                disabled={isLoading}
                                className="btn btn-info">
                                Some button
                            </button>
                        </div>
                    </div>
                </div>
                <div className="">
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped active progress-bar-animated appProgress" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                        <span className="bouncy-ball" role="img" aria-labelledby="jsx-a11y/accessible-emoji">&#129321;</span>
                </div>

                {isLoading &&
                    <div className="marginTop">Loading...</div>
                }
                <div className={`marginTop ${usersWrapperClasses}`}>
                        {renderUsers()}
                </div>
            </div>
    }

export default App;

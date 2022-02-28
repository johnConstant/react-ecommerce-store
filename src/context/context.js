import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [requests, setRequests] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: '' });
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);

    const checkRequests = () => {
        axios
            .get(`${rootUrl}/rate_limit`)
            .then(({ data }) => {
                let {
                    rate: { remaining },
                } = data;
                setRequests(remaining);
                if (remaining === 0) {
                    toggleError(
                        true,
                        'Sorry you have no requests remaining. Come back in an hour!'
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function toggleError(show = false, msg = '') {
        setError({
            show,
            msg,
        });
    }

    const fetchUser = async (user) => {
        toggleError();
        setLoading(true);
        const response = await axios
            .get(`${rootUrl}/users/${user}`)
            .catch((err) => {
                console.log(err);
            });
        if (response) {
            setGithubUser(response.data);
            await fetchRepos(user);
            await fetchFollowers(user);
            setLoading(false);
        } else {
            toggleError(true, 'There is no user with that username');
        }
    };

    //api.github.com/users/john-smilga/repos?per_page=100

    const fetchRepos = async (user) => {
        const res = await fetch(`${rootUrl}/users/${user}/repos?per_page=100`);
        const data = await res.json();
        setRepos(data);
    };

    const fetchFollowers = async (user) => {
        const res = await fetch(
            `${rootUrl}/users/${user}/followers?per_page=100`
        );
        const data = await res.json();
        setFollowers(data);
    };

    useEffect(checkRequests, [githubUser, repos, followers]);

    return (
        <GithubContext.Provider
            value={{
                githubUser,
                repos,
                followers,
                requests,
                error,
                fetchUser,
                loading,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export { GithubContext, GithubProvider };

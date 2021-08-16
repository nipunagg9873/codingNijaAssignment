import config from 'config';
import { authHeader } from '../_helpers';

export const doubtService = {
    raise,
    getAll,
    update,
    accept,
    resolve,
    escalate,
    delete: _delete
};

function raise(doubt, user) {
    let requestData = {
        title: doubt.title,
        description: doubt.description,
        createdBy: user
    }
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    };

    return fetch(`${config.apiUrl}/doubts/raise`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/doubts`, requestOptions).then(handleResponse);
}

function update(doubt) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(doubt)
    };

    return fetch(`${config.apiUrl}/doubts/${doubt.id}`, requestOptions).then(handleResponse);;
}

function accept(doubtId, userId) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({doubtId, userId})
    };

    return fetch(`${config.apiUrl}/doubts/accept`, requestOptions).then(handleResponse);
}

function resolve(doubtId, userId) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/doubts/resolve`, requestOptions).then(handleResponse);
}

function escalate(doubt, user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/doubts/escalate`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/doubts/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
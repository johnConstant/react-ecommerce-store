import React from 'react';

const UserInfoItem = ({ icon, label, value, colour }) => {
    return (
        <article className="item">
            <span className={colour}>{icon}</span>
            <div>
                <h3>{value}</h3>
                <p>{label}</p>
            </div>
        </article>
    );
};

export default UserInfoItem;

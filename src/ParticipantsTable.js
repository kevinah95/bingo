import React from 'react';

const ParticipantsTable = props => {
  const titles = props.participants.length
    ? Object.keys(props.participants[0])
    : [];
  return (
    <table className="pure-table">
      <thead>
        <tr>
          {titles.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.participants.map((participant, index) => {
          return (
            <tr key={index}>
              {titles.map((key, i) => (
                <td key={i}>{participant[key]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ParticipantsTable;

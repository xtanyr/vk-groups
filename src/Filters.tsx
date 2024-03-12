import React from 'react';

interface FiltersProps {
  privacy: string;
  avatarColor: string;
  hasFriends: boolean;
  onPrivacyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onAvatarColorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onHasFriendsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters: React.FC<FiltersProps> = ({ privacy, avatarColor, hasFriends, onPrivacyChange, onAvatarColorChange, onHasFriendsChange }) => {
  return (
    <div className="filters">
      <label htmlFor="privacyFilter">Privacy:</label>
      <select id="privacyFilter" onChange={onPrivacyChange} value={privacy}>
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
      <label htmlFor="avatarColorFilter">Avatar Color:</label>
      <select id="avatarColorFilter" onChange={onAvatarColorChange} value={avatarColor}>
        <option value="any">Any</option>
        <option value="no-color">No Color</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="purple">Purple</option>
        <option value="white">White</option>
        <option value="orange">Orange</option>
      </select>
      <label>
        <input type="checkbox" onChange={onHasFriendsChange} checked={hasFriends} /> Has Friends
      </label>
    </div>
  );
};

export default Filters;
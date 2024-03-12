import React, { useEffect, useState } from 'react';
import './App.css';
import Filters from './Filters';

interface Group {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
}

interface User {
  first_name: string;
  last_name: string;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<Group[]>([]);
  const [filters, setFilters] = useState({
    privacy: 'all',
    avatarColor: 'any',
    hasFriends: false,
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setTimeout(async () => {
        const response = await fetch('/groups.json');
        const data: Group[] = await response.json();
        setGroups(data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    }
  };

  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);

  const toggleFriendsList = (groupId: number) => {
    if (expandedGroup === groupId) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(groupId);
    }
  };

  const applyFilters = () => {
    let filteredGroups = groups;

    if (filters.privacy !== 'all') {
      filteredGroups = filteredGroups.filter(group =>
        filters.privacy === 'open' ? !group.closed : group.closed
      );
    }

    if (filters.avatarColor !== 'any') {
      filteredGroups = filteredGroups.filter(group =>
        filters.avatarColor === 'no-color' ? !group.avatar_color : group.avatar_color === filters.avatarColor
      );
    }

    if (filters.hasFriends) {
      filteredGroups = filteredGroups.filter(group =>
        group.friends && group.friends.length > 0
      );
    }

    return filteredGroups;
  };

  const handlePrivacyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, privacy: event.target.value });
  };

  const handleAvatarColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, avatarColor: event.target.value });
  };

  const handleHasFriendsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, hasFriends: event.target.checked });
  };

  return (
    <div className="App">
      <h1>Groups</h1>
      <Filters
        privacy={filters.privacy}
        avatarColor={filters.avatarColor}
        hasFriends={filters.hasFriends}
        onPrivacyChange={handlePrivacyChange}
        onAvatarColorChange={handleAvatarColorChange}
        onHasFriendsChange={handleHasFriendsChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
      <div className="groups-list">
        {applyFilters().map((group) => (
          <div key={group.id} className="group-item">
            <div className="group-avatar" style={{ backgroundColor: group.avatar_color || '' }}>
              {group.name.substring(0, 1)}
            </div>
            <div className="group-info">
              <div className="group-name">{group.name}</div>
              <div className="group-privacy">{group.closed ? 'Closed' : 'Open'}</div>
              <div className="group-members">
                {group.members_count} members
              </div>
              <div className="group-friends" onClick={() => toggleFriendsList(group.id)}>
                {group.friends && `${group.friends.length} friends`}
              </div>
              {expandedGroup === group.id && group.friends && (
                <div className="group-friends-list">
                  {group.friends.map((friend, index) => (
                    <div key={index} className="friend">
                      {friend.first_name} {friend.last_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default App;

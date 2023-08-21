import { useState, useEffect, useCallback } from 'react';
import { Icons } from './Icons';
import Header from './Header';

const priorityNames = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

const Kanban = () => {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  );
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [groupingMenu, setGroupingMenu] = useState(false);
  const [orderingMenu, setOrderingMenu] = useState(false);
  const [grouping, setGrouping] = useState(
    localStorage.getItem('grouping') || 'status'
  );
  const [ordering, setOrdering] = useState(
    localStorage.getItem('ordering') || 'priority'
  );
  const [headers, setHeaders] = useState([
    {
      name: '',
      icon: '',
      values: [],
    },
  ]);

  const fetchData = useCallback((grouping, ordering) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(({ tickets, users }) => {
        setData(tickets);
        setUsers(users);
        localStorage.setItem('users', JSON.stringify(users));
        setIsUsersLoaded(true); // Mark users data as loaded

        let headerNamesWithNamesAndValues = [];

        if (grouping === 'status') {
          headerNamesWithNamesAndValues = generateHeaderData(
            tickets,
            'status',
            ordering
          );
        } else if (grouping === 'user') {
          headerNamesWithNamesAndValues = generateHeaderData(
            tickets,
            'user',
            ordering
          );
        } else if (grouping === 'priority') {
          headerNamesWithNamesAndValues = generateHeaderData(
            tickets,
            'priority',
            ordering
          );
        }

        setHeaders(headerNamesWithNamesAndValues);

        localStorage.setItem('grouping', grouping);
        localStorage.setItem('ordering', ordering);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  const handleChangeHeader = (newGrouping, newOrdering) => {
    setGrouping(newGrouping);
    setOrdering(newOrdering);

    localStorage.setItem('grouping', newGrouping);
    localStorage.setItem('ordering', newOrdering);

    let headerNamesWithNamesAndValues = [];

    if (newGrouping === 'status') {
      headerNamesWithNamesAndValues = generateHeaderData(
        data,
        'status',
        newOrdering
      );
    } else if (newGrouping === 'user') {
      headerNamesWithNamesAndValues = generateHeaderData(
        data,
        'user',
        newOrdering
      );
    } else if (newGrouping === 'priority') {
      headerNamesWithNamesAndValues = generateHeaderData(
        data,
        'priority',
        newOrdering
      );
    }

    setHeaders(headerNamesWithNamesAndValues);
  };

  const generateHeaderData = (data, grouping, ordering) => {
    const valuesKey =
      grouping === 'status'
        ? 'status'
        : grouping === 'user'
        ? 'userId'
        : 'priority';

    const uniqueValues = [...new Set(data.map((ticket) => ticket[valuesKey]))];

    const sortedUniqueValues = uniqueValues.sort((a, b) => {
      const priorityA = parseInt(a, 10);
      const priorityB = parseInt(b, 10);

      if (isNaN(priorityA)) return -1;
      if (isNaN(priorityB)) return 1;

      return priorityB - priorityA;
    });

    const headerData = sortedUniqueValues.map((value) => {
      const filteredData = data.filter((ticket) => ticket[valuesKey] === value);

      const sortedValues =
        ordering === 'priority'
          ? filteredData.sort((a, b) => b.priority - a.priority)
          : filteredData.sort((a, b) => a.title.localeCompare(b.title));

      return {
        name: getNameForGroupingValue(grouping, value),
        icon: getIconForGroupingValue(grouping, value),
        values: sortedValues,
      };
    });

    console.log(headerData);

    return headerData;
  };

  const getNameForGroupingValue = (grouping, value) => {
    if (grouping === 'status') {
      return value;
    } else if (grouping === 'user') {
      const userData = users.find((userData) => userData.id === value);
      return userData ? userData.name : '';
    } else if (grouping === 'priority') {
      return priorityNames[value];
    }
  };

  const getIconForGroupingValue = (grouping, value) => {
    if (grouping === 'status' || grouping === 'priority') {
      const iconData = Icons.find((icon) => icon.name === value);
      return iconData ? iconData.icon : '';
    } else {
      return (
        <img
          className="kb-user-icon"
          src={
            'https://ui-avatars.com/api/?name=' +
            users?.find((user) => user.id === value)?.name
          }
          alt={users?.find((user) => user.id === value)?.name}
        />
      );
    }
  };

  useEffect(() => {
    const storedGrouping = localStorage.getItem('grouping') || 'status';
    const storedOrdering = localStorage.getItem('ordering') || 'priority';

    if (storedGrouping) {
      setGrouping(storedGrouping);
    }

    if (storedOrdering) {
      setOrdering(storedOrdering);
    }

    fetchData(storedGrouping, storedOrdering);
  }, [fetchData]);
  return (
    <div className="main">
      <Header
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        setGroupingMenu={setGroupingMenu}
        groupingMenu={groupingMenu}
        setOrderingMenu={setOrderingMenu}
        orderingMenu={orderingMenu}
        ordering={ordering}
        grouping={grouping}
        handleChangeHeader={handleChangeHeader}
      />
      {isUsersLoaded && (
        <div className="kanban-container">
          {headers?.map((header, index) => (
            <div key={index} className="kanban-column">
              <div className="kb-header">
                <span className="kb-header-box">
                  <span className="kb-header-title-container">
                    <span className="kb-header-icon-left">{header?.icon}</span>

                    <span className="kb-header-title-text">{header?.name}</span>
                  </span>
                  <span className="kb-value">{header?.values?.length}</span>
                </span>
                <span className="kb-header-box">
                  <button className="kb-header-icon-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="kb-icon-right-size"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  </button>
                  <button className="kb-header-icon-right">
                    <svg
                      className="kb-icon-right-size"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <div className="kb-card-container">
                {header?.values?.map((val, i) => (
                  <div key={i} className="kb-card-box" draggable="true">
                    <div className="kb-card-title-container">
                      <span className="kb-id-box">{val?.id}</span>
                      <div className="kb-user-icon-box">
                        {grouping !== 'user' && (
                          <span
                            title={
                              users?.find((user) => user.id === val?.userId)
                                ?.name
                            }
                            data-tooltip-delay="50"
                          >
                            <img
                              className="kb-user-icon"
                              src={
                                'https://ui-avatars.com/api/?name=' +
                                users?.find((user) => user.id === val?.userId)
                                  ?.name
                              }
                              alt={
                                users?.find((user) => user.id === val?.userId)
                                  ?.name
                              }
                            />
                            <span className="kb-user-status">
                              {users?.find((user) => user.id === val?.userId)
                                ?.available ? (
                                <div className="kb-user-available"></div>
                              ) : (
                                <div className="kb-user-unavailable"></div>
                              )}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="kb-title-container">
                      {grouping !== 'status' && (
                        <div className="kb-title-icon">
                          {
                            Icons.find((icon) => icon.name === val?.status)
                              ?.icon
                          }
                        </div>
                      )}
                      <div className="kb-title">
                        {val?.title?.length > 70
                          ? val?.title?.slice(0, 70) + '...'
                          : val?.title}
                      </div>
                    </div>
                    <div className="kb-tags-container">
                      {grouping !== 'priority' && (
                        <div className="kb-tags-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            className="kb-tags-icon-svg"
                            fill="currentColor"
                          >
                            <path d="M6 10a2 2 0 11-4.001-.001A2 2 0 016 10zm6 0a2 2 0 11-4.001-.001A2 2 0 0112 10zm6 0a2 2 0 11-4.001-.001A2 2 0 0118 10z"></path>
                          </svg>
                        </div>
                      )}
                      <div className="kb-tags">
                        {val?.tag?.map((tag, i) => (
                          <span key={i} className="kb-tags-item">
                            <div className="kb-user-unavailable"></div>
                            <span className="kb-tag-content">{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Kanban;

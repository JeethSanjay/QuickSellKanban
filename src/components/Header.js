import React from 'react';

const Header = (props) => {
  const {
    setShowMenu,
    showMenu,
    setGroupingMenu,
    groupingMenu,
    setOrderingMenu,
    orderingMenu,
    ordering,
    grouping,
    handleChangeHeader,
  } = props;
  return (
    <div className="header-box">
      <div className="header-option">
        <div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            type="button"
            className="custom-button"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            Display
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`icon-chevron 
                    ${!showMenu ? 'icon-rotate' : 'icon-rotate-normal'}
                    `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <div
          className={`dropdown ${
            showMenu ? 'dropdown-visible' : 'dropdown-hidden'
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="dropdown-vertical-padding" role="none">
            <div
              className="dropdown-menu"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              <span>Grouping</span>
              <button
                onClick={() => setGroupingMenu(!groupingMenu)}
                type="button"
                className="dropdown-button"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                {grouping}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`icon-chevron
                        ${!groupingMenu ? 'icon-rotate' : 'icon-rotate-normal'}
                        `}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </button>
              <div
                className={`dropdown-grouping ${
                  groupingMenu ? 'dropdown-visible' : 'dropdown-hidden'
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <span
                  onClick={() => {
                    setGroupingMenu(false);
                    setShowMenu(false);
                    handleChangeHeader('status', ordering);
                  }}
                  className="dropdown-item"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  Status
                </span>
                <span
                  onClick={() => {
                    setGroupingMenu(false);
                    setShowMenu(false);
                    handleChangeHeader('user', ordering);
                  }}
                  className="dropdown-item"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                >
                  User
                </span>
                <span
                  onClick={() => {
                    setGroupingMenu(false);
                    setShowMenu(false);
                    handleChangeHeader('priority', ordering);
                  }}
                  className="dropdown-item"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-3"
                >
                  Priority
                </span>
              </div>
            </div>
            <div
              className="dropdown-menu"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              <span>Ordering</span>
              <button
                onClick={() => setOrderingMenu(!orderingMenu)}
                type="button"
                className="dropdown-button"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                {ordering}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`icon-chevron
                        ${!orderingMenu ? 'icon-rotate' : 'icon-rotate-normal'}
                        `}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </button>
              <div
                className={`dropdown-ordering ${
                  orderingMenu ? 'dropdown-visible' : 'dropdown-hidden'
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <span
                  onClick={() => {
                    setOrderingMenu(false);
                    setShowMenu(false);
                    handleChangeHeader(grouping, 'priority');
                  }}
                  className="dropdown-item"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  Priority
                </span>
                <span
                  onClick={() => {
                    setOrderingMenu(false);
                    setShowMenu(false);
                    handleChangeHeader(grouping, 'title');
                  }}
                  className="dropdown-item"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                >
                  Title
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

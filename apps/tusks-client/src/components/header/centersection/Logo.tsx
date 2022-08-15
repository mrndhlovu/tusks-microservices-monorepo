import Link from 'next/link';

import { MdOutlineLibraryAddCheck } from 'react-icons/md';

import { ROUTES, APP_NAME } from '../../../util/constants';

const Logo = () => {
  return (
    <div className="header-logo-content">
      <Link href={ROUTES.home}>
        <a className="header-logo-text">
          <div className="logo">
            <div>
              <MdOutlineLibraryAddCheck size={23} />
            </div>
            <span>{APP_NAME}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Logo;

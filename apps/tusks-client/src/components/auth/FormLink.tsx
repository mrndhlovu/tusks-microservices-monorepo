import Link from 'next/link';
import { MouseEvent } from 'react';

interface IProps {
  href?: string;
  linkText: string;
  handleClick?: (e: MouseEvent) => void;
  className?: string;
}

const FormLink = ({ href, linkText, handleClick, className }: IProps) => {
  return (
    <Link href={href ? `/${href}` : 'javascript:void(0)'}>
      <a className={`${className} form-link`} onClick={handleClick}>
        {linkText}
      </a>
    </Link>
  );
};

export default FormLink;

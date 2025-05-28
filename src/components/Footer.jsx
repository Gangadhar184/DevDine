import { GITHUB_LINK } from '../constants/constants';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer w-full px-4 py-4 flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-1 text-sm sm:text-base">
      <span>Created By</span>
      <span role="img" aria-label="heart">❤️</span>
      <a
        className="text-blue-600 hover:underline font-medium"
        href={GITHUB_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        Gangadhar
      </a>
      <span>&copy; {year}</span>
      <strong className="ml-0 sm:ml-2 text-gray-700">DevDine</strong>
    </footer>
  );
};

export default Footer;

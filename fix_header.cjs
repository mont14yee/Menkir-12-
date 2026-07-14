const fs = require('fs');
let code = fs.readFileSync('components/Header.tsx', 'utf8');

code = code.replace("import portfolioData from '../portfolio.json';", "import { usePortfolioData } from './PortfolioDataProvider';");

code = code.replace(
    /const ProfileModal: FC<\\{ isOpen: boolean; onClose: \\(\\) => void; season: Season; \\}> = \\(\\{ isOpen, onClose, season \\}\\) => \\{\\s*const \\[profileData, setProfileData\\] = useState<ProfileData \\| null>\\(null\\);/m,
    "const ProfileModal: FC<{ isOpen: boolean; onClose: () => void; season: Season; }> = ({ isOpen, onClose, season }) => {\n    const portfolioData = usePortfolioData();\n    const [profileData, setProfileData] = useState<ProfileData | null>(null);"
);

code = code.replace(
    /useEffect\\(\\(\\) => \\{\\s*setProfileData\\(\\(portfolioData as any\\)\\.profile\\);\\s*setProfilePic\\(\\(portfolioData as any\\)\\.profile\\.pictureUrl\\);\\s*\\}, \\[\\]\\);/m,
    "useEffect(() => { if (portfolioData) { setProfileData((portfolioData as any).profile); setProfilePic((portfolioData as any).profile.pictureUrl); } }, [portfolioData]);"
);

code = code.replace(
    /export const Header: React\\.FC<HeaderProps> = \\(\\{ setView, season \\}\\) => \\{\\s*const \\[isProfileOpen, setIsProfileOpen\\] = useState\\(false\\);/m,
    "export const Header: React.FC<HeaderProps> = ({ setView, season }) => {\n    const portfolioData = usePortfolioData();\n    const [isProfileOpen, setIsProfileOpen] = useState(false);"
);

code = code.replace(
    /useEffect\\(\\(\\) => \\{\\s*const socials = \\(portfolioData as any\\)\\.connect\\.filter\\(\\(c: ConnectLink\\) => \\['instagram', 'linkedin', 'telegram', 'youtube', 'tiktok'\\]\\.includes\\(c\\.id\\)\\);\\s*setConnectLinks\\(socials\\);\\s*if \\(\\(portfolioData as any\\)\\.profile && \\(portfolioData as any\\)\\.profile\\.pictureUrl\\) \\{\\s*setProfilePic\\(\\(portfolioData as any\\)\\.profile\\.pictureUrl\\);\\s*\\}\\s*\\}, \\[\\]\\);/m,
    "useEffect(() => { if (portfolioData) { const socials = (portfolioData as any).connect.filter((c: ConnectLink) => ['instagram', 'linkedin', 'telegram', 'youtube', 'tiktok'].includes(c.id)); setConnectLinks(socials); if ((portfolioData as any).profile && (portfolioData as any).profile.pictureUrl) { setProfilePic((portfolioData as any).profile.pictureUrl); } } }, [portfolioData]);"
);

fs.writeFileSync('components/Header.tsx', code);

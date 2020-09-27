import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (content: string) => toast(content);

export default notify;

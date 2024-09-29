import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";

export default function Home() {
    return (
        <div class="vh-100 vw-100 d-flex flex-row">
            <Sidebar />
            <Editor />
        </div>
    );
}

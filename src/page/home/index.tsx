import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1 className="text-5xl my-6">Welcome to Home page</h1>
      <p className="opacity-80 mb-5">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex tenetur
        veritatis aut vero molestiae at, consectetur repellendus ab dolor
        eligendi minus. Odio vitae corporis mollitia, quia nesciunt beatae
        magnam esse sapiente nam nisi error! Eligendi dicta accusantium saepe
        eius, doloribus error excepturi corporis laborum, porro numquam
        repellendus, mollitia ratione velit nesciunt quasi! Eveniet blanditiis
        magnam accusantium esse eum id officiis assumenda saepe perspiciatis in
        quos illo excepturi, ad rerum, provident laborum libero. Tempora
        explicabo asperiores ex. Dolores eaque sit officiis odit consequuntur
        sint sapiente quae nisi aliquam, quod nesciunt recusandae, ut provident
        eum? Adipisci corporis enim, sapiente, libero praesentium atque odio
        nostrum nihil perspiciatis modi, labore tempore amet est deleniti alias
        nulla laboriosam! Tenetur debitis necessitatibus vel iusto consectetur
        ex minus maxime soluta, earum ratione autem voluptates qui illo non ea
        saepe labore ullam culpa ut aut asperiores adipisci id. Quidem enim
        aspernatur laborum quod eum, quam debitis animi veniam illum quae
        reiciendis ipsum doloremque, odit ut minima qui repellat. Corporis
        voluptas omnis ipsam illum laudantium, suscipit eaque minus pariatur
        eveniet ab magnam vero nostrum officiis, corrupti accusantium ea harum.
      </p>
      <Button onClick={() => navigate("/login")}>Login now</Button>
    </div>
  );
};

export default Home;

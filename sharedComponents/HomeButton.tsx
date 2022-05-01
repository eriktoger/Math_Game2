import Link from "next/link";
import Button from "./Button";

const HomeButton = () => (
  <div className="flex justify-center">
    <Link href="/home">
      <a>
        <Button>Back Home</Button>
      </a>
    </Link>
  </div>
);

export default HomeButton;

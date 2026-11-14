import { PiBoxingGloveFill } from "react-icons/pi";
import { SiChessdotcom } from "react-icons/si";
import { VscTerminalLinux } from "react-icons/vsc";

export const hobbies: {
	icon: React.ReactNode;
	color: string;
	position: React.CSSProperties;
}[] = [
	{
		icon: <PiBoxingGloveFill />,
		color: "#e20000",
		position: { top: "15%", left: "8%" },
	},
	{
		icon: <SiChessdotcom />,
		color: "#007bff",
		position: { bottom: "20%", right: "10%" },
	},
	{
		icon: <VscTerminalLinux />,
		color: "#9370DB",
		position: { top: "60%", left: "5%" },
	},
];
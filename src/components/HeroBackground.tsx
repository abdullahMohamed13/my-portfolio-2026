export function HeroBackground() {
	return (
		<div
			className="absolute inset-0 overflow-hidden pointer-events-none select-none"
			aria-hidden
		>
			{/* Diagonal rule — top-left to mid-right */}
			<svg
				className="absolute inset-0 w-full h-full"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Long diagonal stroke */}
				<line
					x1="-5%"
					y1="15%"
					x2="55%"
					y2="85%"
					stroke="#007bff"
					strokeWidth="0.6"
					strokeOpacity="0.18"
				/>
				{/* Second parallel diagonal, offset */}
				<line
					x1="5%"
					y1="15%"
					x2="65%"
					y2="85%"
					stroke="#007bff"
					strokeWidth="0.3"
					strokeOpacity="0.10"
				/>
				{/* Horizontal rule near bottom */}
				<line
					x1="10%"
					y1="88%"
					x2="60%"
					y2="88%"
					stroke="#9370DB"
					strokeWidth="0.5"
					strokeOpacity="0.20"
				/>
				{/* Short vertical tick */}
				<line
					x1="60%"
					y1="84%"
					x2="60%"
					y2="92%"
					stroke="#9370DB"
					strokeWidth="0.5"
					strokeOpacity="0.20"
				/>
			</svg>

			{/* Bottom-left: small filled dot cluster */}
			{[
				{ x: "8%", y: "72%" },
				{ x: "10%", y: "76%" },
				{ x: "6%", y: "76%" },
				{ x: "8%", y: "80%" },
				{ x: "12%", y: "80%" },
				{ x: "4%", y: "80%" },
			].map((pos, i) => (
				<span
					key={i}
					className="absolute rounded-full"
					style={{
						left: pos.x,
						top: pos.y,
						width: 3,
						height: 3,
						background: "#007bff",
						opacity: 0.22,
					}}
				/>
			))}

			{/* Center-right: thin cross / plus mark */}
			<svg
				className="absolute"
				style={{ right: "22%", top: "42%", opacity: 0.15 }}
				width="18"
				height="18"
				viewBox="0 0 18 18"
				xmlns="http://www.w3.org/2000/svg"
			>
				<line
					x1="9"
					y1="0"
					x2="9"
					y2="18"
					stroke="#9370DB"
					strokeWidth="0.8"
				/>
				<line
					x1="0"
					y1="9"
					x2="18"
					y2="9"
					stroke="#9370DB"
					strokeWidth="0.8"
				/>
			</svg>

			{/* Top-left: tiny square outline */}
			<div
				className="absolute border rotate-12"
				style={{
					width: 22,
					height: 22,
					top: "18%",
					left: "14%",
					borderColor: "#9370DB",
					borderWidth: 0.8,
					opacity: 0.18,
				}}
			/>

			{/* Mid-left: single long vertical rule */}
			<div
				className="absolute"
				style={{
					width: 0.6,
					height: 80,
					top: "38%",
					left: "18%",
					background: "#007bff",
					opacity: 0.13,
				}}
			/>
		</div>
	);
}
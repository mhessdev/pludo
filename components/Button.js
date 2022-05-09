import Link from "next/link";

export default function Button({ onClick = () => {}, text, style, link = "" }) {
	const styles = {
		large: `bg-blue-600 hover:bg-blue-700 
      text-white px-6 py-2 rounded-md border-2 border-blue-600 
      hover:border-blue-700  text-lg sm:text-xl focus:outline-none 
      focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap`,
		medium: `text-white bg-blue-700 hover:bg-blue-800 
      focus:ring-4 focus:ring-blue-300 font-medium 
      rounded-lg text-sm px-5 py-2.5  
      dark:bg-blue-600 dark:hover:bg-blue-700 
      focus:outline-none dark:focus:ring-blue-800`,
		small: `text-white bg-blue-700 hover:bg-blue-800 
    focus:ring-4 focus:ring-blue-300 font-medium 
    rounded-lg text-sm p-2 
    dark:bg-blue-600 dark:hover:bg-blue-700 
    focus:outline-none dark:focus:ring-blue-800`,
	};
	return (
		<>
			{link ? (
				<Link href={link} passHref>
					<button
						type="button"
						className={styles[style]}
						onClick={onClick}
					>
						{text}
					</button>
				</Link>
			) : (
				<button
					type="button"
					className={styles[style]}
					onClick={onClick}
				>
					{text}
				</button>
			)}
		</>
	);
}

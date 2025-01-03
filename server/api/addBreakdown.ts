export default defineEventHandler(async (event) => {
	const { allBreakdowns, musicId } = await readBody(event)

	console.log(musicId)

	try {
		const db = useDatabase("breakdowns")

		await db.sql`
			CREATE TABLE IF NOT EXISTS Song (
			song_id TEXT PRIMARY KEY
		)`

		await db.sql`
			CREATE TABLE IF NOT EXISTS Breakdowns (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			song_id INTEGER NOT NULL,
			json_data TEXT NOT NULL,
			FOREIGN KEY (song_id) REFERENCES Song(song_id)
		)`

		await db.sql`
			INSERT INTO Song (song_id)
			VALUES (${musicId})
		`

		for (const breakdown of allBreakdowns) {
			await db.sql`
				INSERT INTO Breakdowns (song_id, json_data)
				VALUES (${musicId}, ${JSON.stringify(breakdown)})
			`
		}

		const breakdowns = await db.sql`
			SELECT *
			FROM Breakdowns
		`

		return { message: "Breakdowns added successfully" }
	} catch (error) {
		console.error(error)
		return { message: "Add breakdown operation failed" }
	}
})

export async function pludoApi(route, body) {
    try {
        const res = await fetch(
            `https://pludo.thecycledb.com/api/pludo${route}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": "e8LVhZAwLAmaVPCNcqco+cOe4qCIzYQwUBKX+7km5h0=",
                },
                body: JSON.stringify(body),
            }
        );
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

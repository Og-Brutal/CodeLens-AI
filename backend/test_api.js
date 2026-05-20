async function test() {
    try {
        const response = await fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: "console.log('test');",
                language: "javascript"
            })
        });
        
        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Data:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}
test();

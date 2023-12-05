// In your component file
export default function DataImport() {
    const handleFileUpload = async (event) => {
        event.preventDefault();
        const file = event.target.file.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/import', {
            method: 'POST',
            body: formData,
        });

        // Handle the response from the server
        const data = await response.json();
        console.log(data.message);
    };

    return (
        <form onSubmit={handleFileUpload}>
            <input type="file" name="file" accept=".json" />
            <button type="submit">Import Data</button>
        </form>
    );
}

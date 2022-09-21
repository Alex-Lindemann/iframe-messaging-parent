import { useEffect, useState } from 'react';

export default function ReturnedData() {
    const [data, setData] = useState({});

    useEffect(() => {
        if (window.location.search) {
            const params = new URL(window.location).searchParams
            setData(JSON.parse(params.get('fieldValues')))
        }
        window.addEventListener("message", (event) => {
            if (event.data.type === 'message-to-parent') {
                setData(event.data.data.fieldValues);
            }
        }, false);

    }, []);

    return (
        <div>
            Data from other app: {JSON.stringify(data)}
        </div>
    )
}
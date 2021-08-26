import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Home = () => {
    const [ggyutweet, setGgyutweet] = useState("");
    const [ggyutweets, setGgyutweets] = useState([]);

    const getGgyutweets = async () => {
        const dbGgyutweets = await dbService.collection("ggyutweets").get();
        dbGgyutweets.forEach((document) => {
            const ggyutweetObject = { ...document.data(), id: document.id };
            setGgyutweets((prev) => [ggyutweetObject, ...prev])
        });
    };

    useEffect(() => {
        getGgyutweets();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("ggyutweets").add({
            text: ggyutweet,
            createdAt: Date.now(),
        });
        setGgyutweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setGgyutweet(value);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={ggyutweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Ggyutweet" />
            </form>
            <div>
                {ggyutweets.map((ggyutweet) => (
                    <div key={ggyutweet.id}>
                        <h4>{ggyutweet.text}</h4>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
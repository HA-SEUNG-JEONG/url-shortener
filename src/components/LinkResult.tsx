import { useEffect, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface InputProps {
  inputValue: string;
}

const LinkResult = ({ inputValue }: InputProps) => {
  const [state, setState] = useState({
    shortenLink: "",
    copied: false,
    loading: false,
    error: false,
  });

  const fetchData = async () => {
    try {
      setState((existing) => ({ ...existing, loading: true }));
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
      setState((existing) => ({ ...existing, shortenLink: res.data.result.full_short_link }));
    } catch (err) {
      setState((existing) => ({ ...existing, err: err instanceof Error }));
    } finally {
      setState((existing) => ({ ...existing, loading: false }));
    }
  };

  useEffect(() => {
    if (inputValue.length) fetchData();
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState((existing) => ({ ...existing, copied: false }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [state.copied]);

  if (state.loading) <p>Loading...</p>;

  if (state.error) return <p>Something wne t wrong :(</p>;

  return (
    <>
      {state.shortenLink && (
        <div className="result">
          <p>{state.shortenLink}</p>
          <CopyToClipboard
            text={state.shortenLink}
            onCopy={() => setState((existing) => ({ ...existing, copied: true }))}>
            <button>Copy to Clipboard</button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default LinkResult;

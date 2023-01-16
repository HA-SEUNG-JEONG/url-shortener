import { useEffect, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { styled } from "@stitches/react";
import { toast } from "react-toastify";

interface InputProps {
  inputValue: string;
}

const Anchor = styled("a", {
  display: "flex",
  flexDirection: "column",
  padding: "1rem 1rem",
  marginLeft: "0.5rem",
  color: "SkyBlue",
  fontWeight: "bold",
});

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
      setState((existing) => ({ ...existing, shortenLink: res.data.result?.full_short_link }));
      toast.success("링크가 생성되었습니다!");
    } catch (err) {
      toast.error("링크가 유효하지 않습니다.");
      setState((existing) => ({ ...existing, err: err instanceof Error }));
      1;
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
  if (state.error) return <p>링크가 잘못되었습니다. 다시 한번 확인해주세요.</p>;

  const handleCopy = () => {
    setState((existing) => ({ ...existing, copied: true }));
  };

  const onCopiedClick = () => {
    toast.success("성공적으로 복사되었습니다!");
  };

  return (
    <>
      {state.shortenLink && (
        <section>
          <Anchor target="_blank" href={state.shortenLink}>
            {state.shortenLink}
          </Anchor>
          <CopyToClipboard text={state.shortenLink} onCopy={handleCopy}>
            <button onClick={onCopiedClick}>Copy to Clipboard</button>
          </CopyToClipboard>
        </section>
      )}
    </>
  );
};

export default LinkResult;

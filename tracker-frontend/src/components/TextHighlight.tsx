import Highlighter from "react-highlight-words";

export default function TextHighlight({
  searchText,
  text,
}: {
  searchText: string;
  text: string;
}) {
  return (
    <Highlighter
      highlightClassName="YourHighlightClass"
      searchWords={[searchText]}
      autoEscape={true}
      textToHighlight={text}
    />
  );
}

/**
 *
 * Author: Jenish Girish Patel
 * Banner ID: B00897765
 * Email: jenish.patel@dal.ca
 */
import { Button, Flex } from "@chakra-ui/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SingleNote = () => {
  const params = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();
  const sessionInfo = JSON.parse(ReactSession.get("user"));

  const editor = useEditor({
    extensions: [StarterKit],
    content:
      note && note.description ? note.description : "<p>Type Something</p>",
  });

  const handleSave = () => {
    if (params.id === "new") {
      axios
        .post(
          "https://group-18.herokuapp.com/note",
          {
            title: "Something new",
            description: editor.getHTML(),
          },
          {
            headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
          }
        )
        .then((response) => {
          setNote(response.data);
          navigate(`/note/${response.data.id}`);
          // window.location.href =
          //   "https://group-18.netlify.app/note/" + response.data.id;
        })
        .catch(() => {
          toast.error("Error saving note");
        });
    } else {
      axios
        .patch(
          "https://group-18.herokuapp.com/note/" + params.id,
          {
            description: editor.getHTML(),
          },
          {
            headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
          }
        )
        .then((response) => {
          setNote(response.data);
        })
        .catch(() => {
          toast.error("Error saving note");
        });
    }
  };

  useEffect(() => {
    if (params.id === "new") {
      return;
    }
    axios
      .get(`https://group-18.herokuapp.com/note/${params.id}`, {
        headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
      })
      .then((response) => {
        setNote(response.data);
      })
      .catch(() => {
        toast.error("Error fetching data");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    if (note && note.description && editor) {
      editor.commands.clearContent();
      editor.commands.insertContent(note.description);
    }
  }, [note, editor]);

  if (!editor) {
    return <Flex>Editor Not Found</Flex>;
  }

  return !sessionInfo.user.isPaidUser ? (
    navigate("/")
  ) : (
    <Flex w="100%" minH="100vh" justify="center" flexDirection="column">
      <div>
        <Button
          m="1"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          bold
        </Button>
        <Button
          m="1"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          italic
        </Button>
        <Button
          m="1"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          strike
        </Button>
        <Button
          m="1"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          code
        </Button>
        <Button
          m="1"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          clear marks
        </Button>
        <Button m="1" onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </Button>
        <Button
          m="1"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          paragraph
        </Button>
        <Button
          m="1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          h1
        </Button>
        <Button
          m="1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          h2
        </Button>
        <Button
          m="1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          h3
        </Button>
        <Button
          m="1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          h4
        </Button>
        <Button
          m="1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          h5
        </Button>
        <Button
          m="1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          h6
        </Button>
        <Button
          m="1"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          bullet list
        </Button>
        <Button
          m="1"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          ordered list
        </Button>
        <Button
          m="1"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          code block
        </Button>
        <Button
          m="1"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          blockquote
        </Button>
        <Button
          m="1"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          horizontal rule
        </Button>
        <Button
          m="1"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          hard break
        </Button>
        <Button m="1" onClick={() => editor.chain().focus().undo().run()}>
          undo
        </Button>
        <Button m="1" onClick={() => editor.chain().focus().redo().run()}>
          redo
        </Button>
      </div>
      <Flex w="100%" h="100%" shadow="lg" p="5">
        <EditorContent
          editor={editor}
          style={{ width: "100%", height: "100%" }}
        />
      </Flex>

      <Flex>
        <Button colorScheme="blue" onClick={handleSave}>
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default SingleNote;

import React from "react";
import Image from "next/image";
import moment from "moment";
const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <Image
            key={index}
            src={obj.src}
            alt={obj.title}
            layout="responsive"
            height={obj.height}
            width={obj.width}
          />
        );
      default:
        return modifiedText;
    }
  };
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg pb-12 mb-8 lg:p-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <Image
            className="h-full  w-full object-top object-cover rounded-t-lg"
            src={post.featuredImage.url}
            alt={post.title}
            layout="responsive"
            width="100%"
            height="100%"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="w-full flex items-center mb-8">
            <div className="w-full flex items-center  mb-4 mr-8 lg:mb-0 lg:w-auto">
              <Image
                className="align-middle rounded-full"
                src={post.author.photo.url}
                alt={post.author.name}
                layout="fixed"
                width="30px"
                height="30px"
              />
              <p className="inline text-lg ml-3 align-middle text-gray-700">
                {post.author.name}
              </p>
            </div>
            <div className="text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-semibold mb-8">{post.title}</h1>
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemIndex) =>
              getContentFragment(itemIndex, item.text, item)
            );
            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </>
  );
};

export default PostDetail;

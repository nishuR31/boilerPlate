let driveLink=`export default function driveLink(link, mode) {
  let id = link.split("/d/")[link.split("/d/").length - 1].split("/")[0];
  let url;
  if (["view", "v"].map((e) => e.toLowerCase()).includes(mode)) {
    url = \`https://drive.google.com/uc?export=view&id=\${id}\`;
  }
  if (["download", "d"].map((e) => e.toLowerCase()).includes(mode)) {
    url = \`https://drive.google.com/uc?export=download&id=\${id}\`;
  }
  if (["iframe", "i"].map((e) => e.toLowerCase()).includes(mode)) {
    url = \`https://drive.google.com/file/d/\${id}/preview\`;
  }
  return url;
}
`;
export default driveLink;
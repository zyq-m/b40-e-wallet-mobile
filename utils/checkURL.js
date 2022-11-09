export const checkURL = url => {
  const arrURL = url.split("api/");
  if (arrURL.length == 2) {
    let split = arrURL[1].split("/");
    return { id: split[0], name: split[1] };
  } else false;
};

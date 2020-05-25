export default function (value) {
  return (value || '').match(/\d{2} \d{5}-\d{4}/) !== null;
}

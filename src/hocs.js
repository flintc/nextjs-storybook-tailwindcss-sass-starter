export const withMaybeRecoilControlledState = (
  propName,
  ComponentIfRecoil,
  ComponentIfNotRecoil
) => {
  const Component = (props) => {
    const prop = props?.[propName];
    if (
      prop?.constructor?.name?.includes("Recoil") ||
      typeof prop === "function"
    ) {
      return <ComponentIfRecoil {...props} />;
    }
    return <ComponentIfNotRecoil {...props} />;
  };
  return Component;
};
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const withMaybeControlledState = (
  propName,
  StatefulComponent,
  PureComponent
) => {
  const Component = (props) => {
    if (props[`default${capitalize(propName)}`]) {
      return <StatefulComponent {...props} />;
    }
    return <PureComponent {...props} />;
  };
  return Component;
};

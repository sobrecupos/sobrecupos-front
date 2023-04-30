const addPrefix = (prefix: string) => {
  const getPrefixedClassNames = (
    classNames: { [key: string]: string },
    [key, suffix]: string[],
  ) => ({
    ...classNames,
    [key]: `${prefix}__${suffix}`,
  });

  return getPrefixedClassNames;
};

export const buildNamespace = (baseNamespace: string) => {
  const getComponentClassNames = <T extends { [K in keyof T]: string }>(
    componentNamespace: string,
    classNames: T,
  ) => {
    const componentPrefix = `${baseNamespace}-${componentNamespace}`;
    const composedClassNames = Object.entries<string>(classNames).reduce(
      addPrefix(componentPrefix),
      {},
    );

    return {
      ...(composedClassNames as { [K in keyof T]: string }),
      namespace: componentPrefix,
    };
  };

  return getComponentClassNames;
};


export const getComponentClassNames = buildNamespace('ui-mp');
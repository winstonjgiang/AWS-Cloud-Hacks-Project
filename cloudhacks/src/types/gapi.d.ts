declare namespace gapi.client {
  const calendar: {
    events: {
      list: (params: any) => Promise<any>;
    };
  };
} 
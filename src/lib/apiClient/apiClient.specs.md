#### Describes what the API Client needs to do

#### Methods needed:

- Create a new axios instance with the passed config:

     - baseURL
     - headers
     - timeout
     - responseType
  

- A wrapper for get requests. This can optionally accept:

    - urlParams object
    - queryParams object
    - header object

    This method should construct the dynamic parts of the URL
    using the given urlParams object and append the queryParams
    if it is present. If headers is present it will use the headers
    present in the object rather than the default headers returned
    by the instance


-  A wrapper for post requests. Accepts the post data as mandatory
  parameter along with the urlParams, queryParams and header object
  as optional parameters. Same behavior as get wrapper, only difference
  is that it will be a POST request rather than a GET request


- A wrapper for put requests. Accepts the post data as mandatory
  parameter along with the urlParams, queryParams and header object
  as optional parameters. Same behavior as post wrapper, only difference
  is that it will be a PUT request rather than a POST request


- A wrapper for patch requests. Accepts the post data as mandatory
  parameter along with the urlParams, queryParams and header object
  as optional parameters. Same behavior as put wrapper, only difference
  is that it will be a PATCH request rather than a PUT request


- A wrapper for delete requests. Accepts urlParams, queryParams and header object
  as optional parameters. Same behavior as delete wrapper, only difference
  is that it will be a DELETE request rather than a GET request
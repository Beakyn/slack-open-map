import * as _pickDeep from 'lodash-pickdeep';

export const formatResponseBodyList = (body, params, response) => {
  const formattedResponse: any = {
    total: Number.isInteger(response.hits.total.value)
      ? response.hits.total.value
      : response.hits.total,
    limit: body.size || 10,
    skip: body.from || 0,
    scrollId: response._scroll_id || undefined,
    data: response.hits.hits.map((i) => {
      // Return only id string if minified version requested
      if (params.minify) return i._id;

      // Merge id and content of _source
      const item = {id: i._id, ...i._source};

      // Always remove the tenantId and taxonomyId from response
      delete item.tenantId;
      delete item.taxonomyId;

      return item;
    }),
  };

  if (response.aggregations) formattedResponse.aggregations = response.aggregations;

  return formattedResponse;
};

export const formatResponseBodyGet = (response) => {
  // Always remove the tenantId and taxonomyId from response
  delete response._source.tenantId;

  return {
    id: response._id,
    ...response._source,
  };
};

export const formatResponseBodyRemove = (response) => ({id: response._id});

export const formatResponseBodyUpdate = (response) => {
  // Always remove the tenantId and taxonomyId from response
  delete response.get._source.tenantId;

  return {
    id: response._id,
    ...response.get._source,
  };
};

export const formatResponseObject = (data, status?: number) => {
  const result = {
    statusCode: status || 200,
    headers: {
      // Required for CORS support to work
      'Access-Control-Allow-Origin': '*',
      // Required for cookies, authorization headers with HTTPS
      'Access-Control-Allow-Credentials': true,
      // Preflight caches
      'Access-Control-Max-Age': 43200,
    },
    body: JSON.stringify(data),
  };

  return result;
};

export const parseResponseBodyProperties = (body, ALLOWED_PROPERTIES) => {
  if (!ALLOWED_PROPERTIES.includes('*')) {
    body = Array.isArray(body)
      ? body.map((item) => _pickDeep(item, ALLOWED_PROPERTIES))
      : _pickDeep(body, ALLOWED_PROPERTIES);
  }

  return body;
};

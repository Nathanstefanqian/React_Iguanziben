import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const getApi = (url, params) => {
  return axios({
    url: `/api/v1/${url}`,
    params: params
  })
}


export default getApi



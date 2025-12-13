import React, { useEffect, useState, useCallback } from "react";
import s2 from "../../s1-main/App.module.css";
import s from "./HW14.module.css";
import axios from "axios";
import SuperDebouncedInput from "./common/c8-SuperDebouncedInput/SuperDebouncedInput";
import { useSearchParams } from "react-router-dom";

const getTechs = (find: string) => {
  return axios
    .get<{ techs: string[] }>(
      "https://samurai.it-incubator.io/api/3.0/homework/test2",
      { params: { find } }
    )
    .catch((e) => {
      alert(e.response?.data?.errorText || e.message);
      return Promise.reject(e);
    });
};

const HW14 = () => {
  const [find, setFind] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [techs, setTechs] = useState<string[]>([]);

  const sendQuery = useCallback((value: string) => {
    setLoading(true);
    getTechs(value)
      .then((res) => {
        if (res && res.data) {
          setTechs(res.data.techs);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const onChangeText = (value: string) => {
    setFind(value);
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("find", value);
    } else {
      newParams.delete("find");
    }
    setSearchParams(newParams);
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    const findValue = params.find || "";
    setFind(findValue);
    sendQuery(findValue);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const mappedTechs = techs.map((t) => (
    <div key={t} id={"hw14-tech-" + t} className={s.tech}>
      {t}
    </div>
  ));

  return (
    <div id={"hw14"}>
      <div className={s2.hwTitle}>Homework #14</div>

      <div className={s2.hw}>
        <SuperDebouncedInput
          id={"hw14-super-debounced-input"}
          value={find}
          onChangeText={onChangeText}
          onDebouncedChange={sendQuery}
        />

        <div id={"hw14-loading"} className={s.loading}>
          {isLoading ? "...ищем" : <br />}
        </div>

        {mappedTechs}
      </div>
    </div>
  );
};

export default HW14;

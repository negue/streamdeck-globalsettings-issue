/* global $SD, OBSWebSocket, lox */
import React, { useState, useEffect, useReducer } from "react";

import {
  createUseSDAction,
  SDButton,
  SDNumberInput,
  SDTextInput,
  SDSelectInput,
  SDList,
  SDListSelect,
  SDListMultiSelect,
  createUsePluginSettings,
  createUseGlobalSettings
} from "react-streamdeck";

// Slightly modified sdpi.css file. Adds 'data-' prefixes where needed.
import "react-streamdeck/dist/css/sdpi.css";

const createGetSettings = _sd => () => {
  if (_sd.api.getSettings) {
    _sd.api.getSettings(_sd.uuid);
  } else {
    _sd.api.common.getSettings(_sd.uuid);
  }
};

const useSDAction = createUseSDAction({
  useState,
  useEffect
});

export default function ConfigView() {
  const getSettings = createGetSettings($SD);
  useEffect(getSettings, []);

  const connectedResult = useSDAction("connected");

  const [settings, setSettings] = createUsePluginSettings({
    useState,
    useEffect,
    useReducer
  })(
    {
      buttonState: "",
      textState: "",
      numberState: 0,
      selectState: "",
      selectedListState: []
    },
    connectedResult
  );


  // global settings example  (see label="Global SETTINGS")
  const [globalSettings, setGlobalSettings] = createUseGlobalSettings({
    useState,
    useEffect,
    useReducer
  })(
    {
      advanced: false,
      port: 6363,
      protocol: 'ws',
      ip: 'localhost'
    },
    connectedResult
  );

  console.log({
    connectedResult,
    settings,
    globalSettings
  });

  return (
    <div>

      <SDButton
        text={settings.buttonState}
        onSettingsChange={() => {
          const newState = {
            ...settings,
            buttonState: `testing ${Date.now()}`
          };
          setSettings(newState);
        }}
      />
      <SDTextInput
        value={globalSettings.ip}
        label="Global SETTINGS"
        onChange={event => {
          const newState = {
            ...globalSettings,
            ip: event.target.value
          };
          setGlobalSettings(newState);
        }}
      />
      <SDNumberInput
        value={settings.numberState}
        label="Testing"
        onChange={event => {
          const newState = {
            ...settings,
            numberState: event.target.value
          };
          setSettings(newState);
        }}
      />
      <SDSelectInput
        label="Testing"
        selectedOption={settings.selectState}
        options={[
          {
            label: "test1",
            value: "test1"
          },
          {
            label: "test2",
            value: "test2"
          },
          {
            label: "test3",
            value: "test3"
          }
        ]}
        onChange={event => {
          const newState = {
            ...settings,
            selectState: event
          };
          setSettings(newState);
        }}
      />

      <SDList
        label="Test List"
        options={[
          {
            label: "test1",
            value: "test1"
          },
          {
            label: "test2",
            value: "test2"
          },
          {
            label: "test3",
            value: "test3"
          }
        ]}
      />

      <SDListSelect
        label="Test List"
        selectedOptions={settings.selectedListState}
        options={[
          {
            label: "test1",
            value: "test1"
          },
          {
            label: "test2",
            value: "test2"
          },
          {
            label: "test3",
            value: "test3"
          }
        ]}
        onChange={event => {
          const newState = {
            ...settings,
            selectedListState: event
          };
          setSettings(newState);
        }}
      />

      <SDListMultiSelect
        label="Test List"
        selectedOptions={settings.selectedListState}
        options={[
          {
            label: "test1",
            value: "test1"
          },
          {
            label: "test2",
            value: "test2"
          },
          {
            label: "test3",
            value: "test3"
          }
        ]}
        onChange={event => {
          const newState = {
            ...settings,
            selectedListState: event
          };
          setSettings(newState);
        }}
      />
    </div>
  );
}

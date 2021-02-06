port module Main exposing (main)

import Platform

init : () -> ( (), Cmd Msg )
init _ =
  ( (), Cmd.none )

type Msg
  = Ready ()
  | Message String

update : Msg -> () -> ( (), Cmd Msg )
update msg model =
  case msg of
    Ready _ ->
      ((), print "Logged in")

    Message str ->
      if String.startsWith "!" str
      then
        case String.dropLeft 1 str of
          "neko" -> ((), send "にゃーん")
          _ -> ((), send "ねこじゃないなにか")
      else
        ((), Cmd.none)



subscriptions : () -> Sub Msg
subscriptions model =
  Sub.batch
    [ ready Ready
    , message Message
    ]

main =
  Platform.worker
    { init = init
    , update = update
    , subscriptions = subscriptions
    }

port ready : (() -> msg) -> Sub msg
port message : (String -> msg) -> Sub msg
port send : String -> Cmd msg
port print : String -> Cmd msg

#include <node.h>
#include <string>

#include "../contracts.h"
#include "../async/alienfxAsync.h"
#include "../../api/alienfxApi.h"

using namespace v8;
using namespace std;


void InitializeAsync(uv_work_t* request)
{
    InitializeBaton* baton = static_cast<InitializeBaton*>(request->data);

    LFX_RESULT result = ALIENFX_API.Initialize();

    baton->Result = result;
}

void InitializeAsyncAfter(uv_work_t* request, int status)
{
    InitializeBaton* baton = static_cast<InitializeBaton*>(request->data);

    Handle<Value> error = Null();
    Handle<Object> data = Object::New();
    data->Set(String::NewSymbol("result"), Number::New(baton->Result));

    Handle<Value> argv[2] { error, data };
    baton->Callback->Call(Context::GetCurrent()->Global(), 2, argv);
    baton->Callback.Dispose();

    delete baton;
}

Handle<Value> Initialize(const Arguments& args)
{
    HandleScope scope;

    REQUIRE_NUMBER_OF_ARGUMENTS(scope, args, 1);
    REQUIRE_FUNCTION(scope, args, 0);


    Handle<Function> callback = Handle<Function>::Cast(args[0]);

    InitializeBaton* baton = new InitializeBaton();
    baton->Request.data = baton;
    baton->Callback = Persistent<Function>::New(callback);

    uv_queue_work(uv_default_loop(), &baton->Request, InitializeAsync, InitializeAsyncAfter);

    return scope.Close(Undefined());
}




void ReleaseAsync(uv_work_t* request)
{
    InitializeBaton* baton = static_cast<InitializeBaton*>(request->data);

    LFX_RESULT result = ALIENFX_API.Release();

    baton->Result = result;
}

void ReleaseAsyncAfter(uv_work_t* request, int status)
{
    ReleaseBaton* baton = static_cast<ReleaseBaton*>(request->data);

    Handle<Value> error = Null();
    Handle<Object> data = Object::New();
    data->Set(String::NewSymbol("result"), Number::New(baton->Result));

    Handle<Value> argv[2] { error, data };
    baton->Callback->Call(Context::GetCurrent()->Global(), 2, argv);
    baton->Callback.Dispose();

    delete baton;
}

Handle<Value> Release(const Arguments& args)
{
    HandleScope scope;

    REQUIRE_NUMBER_OF_ARGUMENTS(scope, args, 1);
    REQUIRE_FUNCTION(scope, args, 0);


    Handle<Function> callback = Handle<Function>::Cast(args[0]);

    ReleaseBaton* baton = new ReleaseBaton();
    baton->Request.data = baton;
    baton->Callback = Persistent<Function>::New(callback);

    uv_queue_work(uv_default_loop(), &baton->Request, ReleaseAsync, ReleaseAsyncAfter);

    return scope.Close(Undefined());
}


void GetNumDevicesAsync(uv_work_t* request)
{
    GetNumDevicesBaton* baton = static_cast<GetNumDevicesBaton*>(request->data);

    LFX_RESULT result = ALIENFX_API.GetNumDevices(&baton->NumberOfDevices);

    baton->Result = result;
}

void GetNumDevicesAsyncAfter(uv_work_t* request, int status)
{
    GetNumDevicesBaton* baton = static_cast<GetNumDevicesBaton*>(request->data);

    Handle<Value> error = Null();
    Handle<Object> data = Object::New();
    data->Set(String::NewSymbol("result"), Number::New(baton->Result));
    
    if (baton->Result == LFX_SUCCESS)
    {
        data->Set(String::NewSymbol("numberOfDevices"), Number::New(baton->NumberOfDevices));
    }


    Handle<Value> argv[2] { error, data };
    baton->Callback->Call(Context::GetCurrent()->Global(), 2, argv);
    baton->Callback.Dispose();

    delete baton;
}

Handle<Value> GetNumDevices(const Arguments& args)
{
    HandleScope scope;

    REQUIRE_NUMBER_OF_ARGUMENTS(scope, args, 1);
    REQUIRE_FUNCTION(scope, args, 0);


    Handle<Function> callback = Handle<Function>::Cast(args[0]);

    GetNumDevicesBaton* baton = new GetNumDevicesBaton();
    baton->Request.data = baton;
    baton->Callback = Persistent<Function>::New(callback);

    uv_queue_work(uv_default_loop(), &baton->Request, GetNumDevicesAsync, GetNumDevicesAsyncAfter);

    return scope.Close(Undefined());
}



void GetDeviceDescriptionAsync(uv_work_t* request)
{
    GetDeviceDescriptionBaton* baton = static_cast<GetDeviceDescriptionBaton*>(request->data);
    
    string deviceDescription(LFX_DEF_STRING_SIZE, 0);

    LFX_RESULT result = ALIENFX_API.GetDeviceDescription(
        baton->DeviceIndex,
        (char *)deviceDescription.c_str(),
        deviceDescription.size(),
        &baton->DeviceType);

    baton->Result = result;
    baton->DeviceModel = deviceDescription;
}

void GetDeviceDescriptionAsyncAfter(uv_work_t* request, int status)
{
    GetDeviceDescriptionBaton* baton = static_cast<GetDeviceDescriptionBaton*>(request->data);

    Handle<Value> error = Null();
    Handle<Object> data = Object::New();
    data->Set(String::NewSymbol("result"), Number::New(baton->Result));

    if (baton->Result == LFX_SUCCESS)
    {
        data->Set(String::NewSymbol("model"), String::New(baton->DeviceModel.c_str()));
        data->Set(String::NewSymbol("type"), Number::New(baton->DeviceType));
    }


    Handle<Value> argv[2] { error, data };
    baton->Callback->Call(Context::GetCurrent()->Global(), 2, argv);
    baton->Callback.Dispose();

    delete baton;
}

Handle<Value> GetDeviceDescription(const Arguments& args)
{
    HandleScope scope;

    REQUIRE_NUMBER_OF_ARGUMENTS(scope, args, 2);
    REQUIRE_NUMBER(scope, args, 0);
    REQUIRE_FUNCTION(scope, args, 1);


    unsigned int deviceIndex = args[0]->Uint32Value();
    Handle<Function> callback = Handle<Function>::Cast(args[1]);

    GetDeviceDescriptionBaton* baton = new GetDeviceDescriptionBaton();
    baton->Request.data = baton;
    baton->DeviceIndex = deviceIndex;
    baton->Callback = Persistent<Function>::New(callback);

    uv_queue_work(uv_default_loop(), &baton->Request, GetDeviceDescriptionAsync, GetDeviceDescriptionAsyncAfter);

    return scope.Close(Undefined());
}



void InitAsyncBindings(const v8::Handle<v8::Object>& target)
{
    NODE_SET_METHOD(target, "initialize", Initialize);
    NODE_SET_METHOD(target, "release", Release);
    NODE_SET_METHOD(target, "getNumDevices", GetNumDevices);
    NODE_SET_METHOD(target, "getDeviceDescription", GetDeviceDescription);
}

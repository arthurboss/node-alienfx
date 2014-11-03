#include "contracts.h"

using namespace v8;


void Contracts::RequireNumberOfArguments(const Arguments& args, int requiredNumberOfArguments)
{
    if (args.Length() < requiredNumberOfArguments)
    {
        char exceptionMessage[32];
        _snprintf(exceptionMessage, sizeof exceptionMessage, "Function expects %d parameters.", requiredNumberOfArguments);

        Local<Value> exception = Exception::Error(String::New(exceptionMessage));
        ThrowException(exception);
    }
}

void Contracts::RequireObjectArgument(const Arguments& args, int argumentIndex)
{
    if (!args[argumentIndex]->IsObject())
    {
        char exceptionMessage[32];
        _snprintf(exceptionMessage, sizeof exceptionMessage, "Argument %d must be of type object.", argumentIndex);

        Local<Value> exception = Exception::TypeError(String::New(exceptionMessage));
        ThrowException(exception);
    }
}
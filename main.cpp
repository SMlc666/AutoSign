#include "include/signature.hpp"
#include <cstdint>
#include <cstring>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>
static_assert(QIS_SIGNATURE_USE_AVX2);
static_assert(QIS_SIGNATURE_USE_TBB);
std::unordered_map<std::string, std::string> IDApattern = {
    {"Player::Player",
     "? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? 91 ? ? ? D1 "
     "? ? ? B9 ? ? ? D5 ? ? ? F9 ? ? ? F9 ? ? ? F9"},
    {"Minecraft::update",
     "? ? ? D1 ? ? ? 6D ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 "
     "? ? ? 91 ? ? ? D5 ? ? ? F9 F4 03 00 AA ? ? ? F8 ? ? ? 95"},
};
qis::signature makeSignature(const std::string &pattern) {
    std::string mask;
    std::vector<char> bytes;

    const size_t pattern_len = pattern.length();
    for (std::size_t i = 0; i < pattern_len; i++) {
        if (pattern[i] == ' ')
            continue;

        if (pattern[i] == '?') {
            bytes.push_back(0);
            mask += '?';
        } else if (pattern_len > i + 1 && std::isxdigit(pattern[i]) && std::isxdigit(pattern[i + 1])) {
            bytes.push_back(static_cast<char>(std::stoi(pattern.substr(i, 2), nullptr, 16)));
            mask += 'x';
            i++; // Skip the next character since we processed two characters
        }
    }

    if (bytes.empty() || mask.empty() || bytes.size() != mask.size()) {
        throw std::invalid_argument("Invalid pattern");
    }

    // Convert bytes to a string_view
    std::string_view bytes_view(bytes.data(), bytes.size());
    std::string_view mask_view(mask);

    return qis::signature(bytes_view, mask_view);
}
int main() {
  std::vector<std::uint8_t> memory;
  const std::string pathfile = "libminecraftpe.so";
  std::cout << "Scanning " << pathfile << std::endl;
  memory.resize(std::filesystem::file_size(pathfile));
  std::ifstream file(pathfile, std::ios::binary);
  file.read(reinterpret_cast<char *>(memory.data()), memory.size());
  file.close();
  for (auto &pattern : IDApattern) {
    std::cout << "Searching for " << pattern.first << std::endl;
    const qis::signature search = makeSignature(pattern.second);
    const auto pos = qis::scan(memory.data(), memory.size(), search);
    if (pos == qis::npos) {
      std::cout << "Not found" << std::endl;
    } else {
      std::cout << "Found at " << pos << std::endl;
    }
  }
  return 0;
}
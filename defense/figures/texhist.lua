local texhist = {}

texhist.history_root = "../oolin/histories/simple/"

texhist.call_pat = "%s*%[(%d+)%] call ([a-z]+) ?%(?([<>%?,a-z0-9]*)%)?"
texhist.ret_pat = "%s*%[(%d+)%] return ?([<>%?%(%),a-z0-9]*)"


function texhist.table_contains(tbl, elem)
    for _,val in pairs(tbl) do
      if val == elem then
        return true
      end
    end
    return false
end

function texhist.get_thr(thrs)
  local i = 1
  while texhist.table_contains(thrs, i) do
    i = i + 1
  end
  return i
end

function texhist.hist2tex(history, condense)
  local con = condense or true

  local res = ""
  local threads = {}
  local names = {}

  for line in history do
    local thr, op, val = line:match(texhist.call_pat)
    if line == "skip" then
      res = res .. "\\steptimeline"
    elseif thr then
      local th = thr
      if con then
        th = texhist.get_thr(threads)
        threads[thr] = th
      end

      res = res .. "\\tlcall{" .. th .. "}{\\" .. op .. "of"
      if val then
        res = res .. "{" .. val .. "}"
        end
      res = res .. "}\n"
    else
      local thr, val = line:match(texhist.ret_pat)
      if thr then
        local th = thr
        if con then
          th = threads[thr]
          threads[thr] = nil
        end

        res = res .. "\\tlret"
        if val then
          res = res .. "[" .. val .. "]"
        end

        res = res .. "{" .. th .. "}\n"
      end
    end
  end
  return res
end

function texhist.h2t(filename, condense)
  return texhist.hist2tex(io.lines(filename), condense)
end

return texhist
